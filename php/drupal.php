<?php
// custom_ms_settings_form
function custom_export_download_file_form($form, &$form_state) {
  $form = array();
  $form['language'] = array('#type' => 'select', '#options' => _custom_export_get_language_list(), '#title' => t('Language'));

  $form['submit'] = array('#type' => 'submit', '#value' => t('Export users data'));
  return $form;
}

function custom_export_download_file_form_validate($form, &$form_state) {
  if (!$form_state['values']['language']) {
    form_set_error('language', t('Select language'));
  }
}

function custom_export_download_file_form_submit($form, &$form_state) {
  $sql = "select users.uid as uid,users.name as name ,users.pass as pass ,users.mail as mail,
          retailer.EANCode as eancode, userpoints_total.points as points, retaileruser.Phone as phone from users inner join retaileruser on retaileruser.ID = users.uid inner join retailer on retaileruser.RetailerID = retailer.id
          left join userpoints_total on userpoints_total.uid = users.uid where users.language = :language";

  $res = db_query($sql, array(':language' => $form_state['values']['language']));
  $file_name = "{$form_state['values']['language']}_custom_users.csv";

  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
  header('Content-Description: File Transfer');
  header("Content-type: text/csv; charset=utf-8");
  header("Content-Disposition: attachment; filename={$file_name}");
  header("Expires: 0");
  header("Pragma: public");

  $fh = @fopen('php://output', 'w');
//write the header row.
  fputcsv($fh, array('name', 'password', 'email', 'phone', 'eancode', 'points', 'cash', 'lottery'));
  while ($row = $res->fetchObject()) {
    $points = userpoints_get_current_points($row->uid);
    $cash = custom_cash_get_cash('cash', $row->uid);
    $lottery = custom_cash_get_cash("lottery", $row->uid);
//write row.
    fputcsv($fh, array($row->name, $row->pass, $row->mail, $row->phone, $row->eancode, $points, $cash, $lottery));
  }

// Close the file
  fclose($fh);
// Make sure nothing else is sent, our file is done
  exit;

}

function custom_export_download_answers_form_submit() {
  $select = db_select('quiz_short_answer_user_answers', 'qsa');
  $select->addJoin('inner', 'node', 'node', 'node.nid = qsa.question_nid and node.vid = qsa.question_vid');
  $select->addJoin('inner', 'quiz_node_results_answers', 'qnr', 'qnr.result_id = qsa.result_id and qnr.question_nid = qsa.question_nid and qnr.question_vid = qsa.question_vid');
  $select->addJoin('inner', 'users', 'users', 'qnr.uid = users.uid');
  $select->addField('qsa', 'answer');
  $select->addField('node', 'title');
  $select->addField('users', 'name');
  $select->addField('users', 'uid');
  $select->orderBy('qnr.result_id', 'desc');
  $res = $select->execute();
  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
  header('Content-Description: File Transfer');
  header("Content-type: text/csv; charset=utf-8");
  header("Content-Disposition: attachment; filename=quiz_answers.csv");
  header("Expires: 0");
  header("Pragma: public");
  $fh = @fopen('php://output', 'w');
//write the header row.
//name	password	email	phone	ean code
  fputcsv($fh, array('answer', 'question', 'name', 'uid', 'eancode', 'store name'));
  while ($row = $res->fetchObject()) {
    if ($eancode = _custom_get_eancode_from_account(user_load($row->uid))) {
      if ($pos_node = _custom_get_node_by_eancode($eancode)) {
        $pos_name = $pos_node->title;
        fputcsv($fh, array($row->answer, $row->title, $row->name, $row->uid, $eancode, $pos_name));
      }
    }
  }
// Close the file
  fclose($fh);
// Make sure nothing else is sent, our file is done
  exit;

}